import { useMemo, useState, type CSSProperties } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '../../../components/ui/command';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover';
import { cn } from '../../../lib/utils';
import { ChevronsUpDown, Check, GripVertical, X } from 'lucide-react';

export interface UserGroupDto {
    code: string;
    name: string;
    description?: string | null;
    rate: number;
}

interface GroupSelectorProps {
    groups: UserGroupDto[];
    value: string[];
    onChange: (next: string[]) => void;
    placeholder?: string;
    invalid?: boolean;
}

function SortableGroupItem({ group, index, onRemove }: { group: UserGroupDto; index: number; onRemove: () => void }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: group.code
    });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                'flex items-center gap-3 rounded-md border bg-muted/40 px-3 py-2 transition-shadow',
                isDragging && 'shadow-lg'
            )}
        >
            <span className="w-5 text-right text-xs font-medium text-muted-foreground">
                {index + 1}
            </span>
            <button
                type="button"
                className="text-muted-foreground hover:text-foreground"
                {...attributes}
                {...listeners}
            >
                <GripVertical className="h-4 w-4" />
            </button>
            <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                    <span className="font-medium leading-none">{group.name}</span>
                    <Badge variant="outline" className="whitespace-nowrap text-xs">
                        倍率: {group.rate}
                    </Badge>
                </div>
                {group.description && (
                    <span className="text-xs text-muted-foreground">{group.description}</span>
                )}
            </div>
            <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                onClick={onRemove}
            >
                <X className="h-3 w-3" />
            </Button>
        </div>
    );
}

export function GroupSelector({ groups, value, onChange, placeholder, invalid }: GroupSelectorProps) {
    const [open, setOpen] = useState(false);

    const groupMap = useMemo(() => {
        const result = new Map<string, UserGroupDto>();
        groups.forEach((group) => {
            result.set(group.code, group);
        });
        return result;
    }, [groups]);

    const selectedGroups = value
        .map((code) => groupMap.get(code))
        .filter((group): group is UserGroupDto => Boolean(group));

    const toggleGroup = (code: string) => {
        if (value.includes(code)) {
            onChange(value.filter((item) => item !== code));
            return;
        }

        onChange([...value, code]);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = value.indexOf(active.id as string);
        const newIndex = value.indexOf(over.id as string);

        if (oldIndex === -1 || newIndex === -1) return;

        const reordered = arrayMove(value, oldIndex, newIndex);
        onChange(reordered);
    };

    return (
        <div className="space-y-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            'w-full justify-between',
                            value.length === 0 && 'text-muted-foreground',
                            invalid && 'border-red-300 focus-visible:ring-red-400'
                        )}
                    >
                        {value.length === 0
                            ? placeholder ?? '选择一个或多个分组'
                            : `已选择 ${value.length} 个分组`}
                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[360px] p-0" align="start">
                    <Command>
                        <CommandInput placeholder="搜索分组" />
                        <CommandEmpty>暂无匹配的分组</CommandEmpty>
                        <CommandList>
                            <CommandGroup>
                                {groups.map((group) => {
                                    const isSelected = value.includes(group.code);
                                    return (
                                        <CommandItem
                                            key={group.code}
                                            value={`${group.name} ${group.code}`}
                                            onSelect={() => toggleGroup(group.code)}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="flex flex-1 flex-col gap-1">
                                                <span className="font-medium leading-none">{group.name}</span>
                                                {group.description && (
                                                    <span className="text-xs text-muted-foreground">
                                                        {group.description}
                                                    </span>
                                                )}
                                            </div>
                                            <Badge variant="outline" className="text-xs">
                                                倍率: {group.rate}
                                            </Badge>
                                            {isSelected && <Check className="h-4 w-4" />}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={value} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2">
                        {selectedGroups.length === 0 ? (
                            <p className="text-sm text-muted-foreground">尚未选择分组</p>
                        ) : (
                            selectedGroups.map((group, index) => (
                                <SortableGroupItem
                                    key={group.code}
                                    group={group}
                                    index={index}
                                    onRemove={() => toggleGroup(group.code)}
                                />
                            ))
                        )}
                    </div>
                </SortableContext>
            </DndContext>

            <p className="text-xs text-muted-foreground">
                拖动手柄调整优先级，靠前的分组会优先分配渠道。
            </p>
        </div>
    );
}

export default GroupSelector;

import { Book, Github, HelpCircle } from 'lucide-react';
import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const BottomActions = memo(() => {
  return (
    <div className="flex justify-evenly items-center py-2 w-full mb-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full transition-transform hover:scale-110"
            asChild
          >
            <Link to={'https://github.com/AIDotNet/Thor'} target={'_blank'}>
              <Github className="h-5 w-5" />
              <span className="sr-only">Thor开源地址</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Thor开源地址</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full transition-transform hover:scale-110"
            asChild
          >
            <Link to={'/doc'} target={'_blank'}>
              <Book className="h-5 w-5" />
              <span className="sr-only">Thor文档</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Thor文档</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full transition-transform hover:scale-110"
            asChild
          >
            <Link to={'/help'} target={'_blank'}>
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">帮助中心</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>帮助中心</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
});

export default BottomActions;

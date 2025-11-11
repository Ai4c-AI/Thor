import { Zap, Github } from 'lucide-react';
import {
    email
} from '../../../package.json'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

export default function ThorFooter() {
    const navigate = useNavigate()

    return (
        <footer className="bg-slate-900 text-slate-400 py-12">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-6">
                        <div className="flex items-center text-white mb-4">
                            <Zap className="text-yellow-500 w-6 h-6 mr-2" />
                            <span className="text-xl font-bold">Thor 雷神托尔</span>
                        </div>
                        <p className="text-slate-400 mb-4">
                            Thor是开源的免费并且可商用的开源项目。致力于为开发者提供高效、稳定的AI服务接口。兼容OpenAI API，支持多种模型，按量计费，价格透明。
                        </p>
                        <div className="mt-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={()=>{
                                    window.open('https://github.com/AIDotNet/Thor','_blank')
                                }}
                                className="rounded-full border-slate-600 hover:bg-slate-800"
                            >
                                <Github className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        <h4 className="text-white font-semibold mb-4">产品</h4>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => navigate('/model')}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    模型列表
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="md:col-span-3">
                        <h4 className="text-white font-semibold mb-4">支持</h4>
                        <ul className="space-y-2">
                            <li><span className="text-slate-400">开发文档</span></li>
                            <li><span className="text-slate-400">常见问题</span></li>
                            <li>
                                <button
                                    onClick={()=>{
                                        window.location.href = `mailto:${email}`;
                                    }}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    联系我们
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <Separator className="bg-slate-700 my-8" />
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-400 mb-2 md:mb-0">© 2025 AIDotNet. All rights reserved.</p>
                    <p className="text-slate-500">Powered by .NET 9</p>
                </div>
            </div>
        </footer>
    )
}
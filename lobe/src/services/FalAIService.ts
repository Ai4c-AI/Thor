import { get, postJson } from '../utils/fetch';

// Fal AI API 响应接口
export interface FalResponse {
  request_id?: string;
  status?: 'IN_QUEUE' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  images?: Array<{
    url: string;
    file_name: string;
    file_size?: number;
    content_type: string;
  }> | string[];
  description?: string;
  error?: string;
  logs?: string[];
}

// 生成请求参数
export interface FalGenerationRequest {
  prompt: string;
  num_images: number;
  guidance_scale?: number;
  num_inference_steps?: number;
  seed?: number;
}

// 编辑请求参数
export interface FalEditRequest extends FalGenerationRequest {
  image_url: string;
  mask_url?: string;
  strength?: number;
}

class FalAIService {
  /**
   * 生成图片
   */
  async generateImage(params: FalGenerationRequest): Promise<FalResponse> {
    return postJson('/fal-ai/nano-banana', params);
  }

  /**
   * 编辑图片
   */
  async editImage(params: FalEditRequest): Promise<FalResponse> {
    return postJson('/fal-ai/nano-banana/edit', params);
  }

  /**
   * 查询任务状态
   */
  async getTaskResult(modelName: string, requestId: string): Promise<FalResponse> {
    return get(`/fal-ai/${modelName}/requests/${requestId}`);
  }

  /**
   * 轮询任务直到完成
   */
  async pollTaskUntilComplete(
    modelName: string,
    requestId: string,
    onProgress?: (progress: number) => void,
    maxAttempts: number = 60,
    interval: number = 5000
  ): Promise<FalResponse> {
    return new Promise((resolve, reject) => {
      let attempts = 0;

      const poll = async () => {
        if (attempts >= maxAttempts) {
          reject(new Error('任务超时'));
          return;
        }

        try {
          const result = await this.getTaskResult(modelName, requestId);

          if (result.status === 'COMPLETED') {
            resolve(result);
          } else if (result.status === 'FAILED') {
            reject(new Error(result.error || '任务处理失败'));
          } else {
            // 更新进度
            const progress = Math.min(10 + (attempts * 1.5), 90);
            onProgress?.(progress);

            // 继续轮询
            attempts++;
            setTimeout(poll, interval);
          }
        } catch (error) {
          attempts++;
          if (attempts >= maxAttempts) {
            reject(error);
          } else {
            setTimeout(poll, interval);
          }
        }
      };

      // 开始轮询
      setTimeout(poll, 2000); // 2秒后开始第一次查询
    });
  }

  /**
   * 将文件转换为 base64 URL
   */
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * 验证图片文件
   */
  validateImageFile(file: File): boolean {
    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      return false;
    }

    // 检查文件大小 (最大 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return false;
    }

    return true;
  }

  /**
   * 压缩图片
   */
  async compressImage(file: File, maxWidth: number = 1024, quality: number = 0.9): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // 计算压缩尺寸
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        // 绘制压缩图片
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 转换为 base64
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            } else {
              reject(new Error('图片压缩失败'));
            }
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * 下载图片
   */
  downloadImage(imageUrl: string, filename: string): void {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * 获取预设提示词模板
   */
  getPromptTemplates(): Array<{ name: string; prompt: string; category: string }> {
    return [
      {
        name: '写实人像',
        prompt: 'beautiful portrait of a person, photorealistic, detailed, high quality, professional photography',
        category: '人像'
      },
      {
        name: '自然风景',
        prompt: 'breathtaking landscape, natural scenery, high resolution, vivid colors, peaceful atmosphere',
        category: '风景'
      },
      {
        name: '抽象艺术',
        prompt: 'abstract art, colorful, modern, artistic composition, creative design',
        category: '艺术'
      },
      {
        name: '科技未来',
        prompt: 'futuristic technology, cyberpunk style, neon lights, digital art, sci-fi atmosphere',
        category: '科技'
      },
      {
        name: '卡通动漫',
        prompt: 'anime style illustration, cute character, vibrant colors, manga art style',
        category: '动漫'
      },
      {
        name: '建筑设计',
        prompt: 'modern architecture, architectural visualization, clean lines, contemporary design',
        category: '建筑'
      }
    ];
  }
}

export const falAIService = new FalAIService();
export default falAIService;
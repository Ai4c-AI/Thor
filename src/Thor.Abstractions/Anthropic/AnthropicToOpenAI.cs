using System.Text.Json;
using Thor.Abstractions.Chats.Dtos;

namespace Thor.Abstractions.Anthropic;

public static class AnthropicToOpenAi
{
    /// <summary>
    /// 将AnthropicInput转换为ThorChatCompletionsRequest
    /// </summary>
    public static ThorChatCompletionsRequest ConvertAnthropicToOpenAi(AnthropicInput anthropicInput)
    {
        var openAiRequest = new ThorChatCompletionsRequest
        {
            Model = anthropicInput.Model,
            MaxTokens = anthropicInput.MaxTokens,
            Stream = anthropicInput.Stream,
            Messages = new List<ThorChatMessage>(anthropicInput.Messages.Count)
        };

        // high medium minimal low
        if (openAiRequest.Model.EndsWith("-high") ||
            openAiRequest.Model.EndsWith("-medium") ||
            openAiRequest.Model.EndsWith("-minimal") ||
            openAiRequest.Model.EndsWith("-low"))
        {
            openAiRequest.ReasoningEffort = openAiRequest.Model switch
            {
                var model when model.EndsWith("-high") => "high",
                var model when model.EndsWith("-medium") => "medium",
                var model when model.EndsWith("-minimal") => "minimal",
                var model when model.EndsWith("-low") => "low",
                _ => "medium"
            };

            openAiRequest.Model = openAiRequest.Model.Replace("-high", "")
                .Replace("-medium", "")
                .Replace("-minimal", "")
                .Replace("-low", "");
        }

        if (anthropicInput.Thinking != null &&
            anthropicInput.Thinking.Type.Equals("enabled", StringComparison.OrdinalIgnoreCase))
        {
            openAiRequest.Thinking = new ThorChatClaudeThinking()
            {
                BudgetToken = anthropicInput.Thinking.BudgetTokens,
                Type = "enabled",
            };
            openAiRequest.EnableThinking = true;
        }

        if (openAiRequest.Model.EndsWith("-thinking"))
        {
            openAiRequest.EnableThinking = true;
            openAiRequest.Model = openAiRequest.Model.Replace("-thinking", "");
        }

        if (openAiRequest.Stream == true)
        {
            openAiRequest.StreamOptions = new ThorStreamOptions()
            {
                IncludeUsage = true,
            };
        }

        if (!string.IsNullOrEmpty(anthropicInput.System))
        {
            openAiRequest.Messages.Add(ThorChatMessage.CreateSystemMessage(anthropicInput.System));
        }

        if (anthropicInput.Systems?.Count > 0)
        {
            foreach (var systemContent in anthropicInput.Systems)
            {
                openAiRequest.Messages.Add(ThorChatMessage.CreateSystemMessage(systemContent.Text ?? string.Empty));
            }
        }

        // 处理messages
        if (anthropicInput.Messages != null)
        {
            foreach (var message in anthropicInput.Messages)
            {
                var thorMessages = ConvertAnthropicMessageToThor(message);
                // 需要过滤 空消息
                if (thorMessages.Count == 0)
                {
                    continue;
                }

                openAiRequest.Messages.AddRange(thorMessages);
            }

            openAiRequest.Messages = openAiRequest.Messages
                .Where(m => !string.IsNullOrEmpty(m.Content) || m.Contents?.Count > 0 || m.ToolCalls?.Count > 0 ||
                            !string.IsNullOrEmpty(m.ToolCallId))
                .ToList();
        }

        // 处理tools
        if (anthropicInput.Tools is { Count: > 0 })
        {
            openAiRequest.Tools = anthropicInput.Tools.Where(x => x.name != "web_search")
                .Select(ConvertAnthropicToolToThor).ToList();
        }

        // 判断是否存在web_search
        if (anthropicInput.Tools?.Any(x => x.name == "web_search") == true)
        {
            openAiRequest.WebSearchOptions = new ThorChatWebSearchOptions()
            {
            };
        }

        // 处理tool_choice
        if (anthropicInput.ToolChoice != null)
        {
            openAiRequest.ToolChoice = ConvertAnthropicToolChoiceToThor(anthropicInput.ToolChoice);
        }

        return openAiRequest;
    }

    /// <summary>
    /// 根据最后的内容块类型和OpenAI的完成原因确定Claude的停止原因
    /// </summary>
    public static string GetStopReasonByLastContentType(string? openAiFinishReason, string lastContentBlockType)
    {
        // 如果最后一个内容块是工具调用，优先返回tool_use
        if (lastContentBlockType == "tool_use")
        {
            return "tool_use";
        }

        // 否则使用标准的转换逻辑
        return GetClaudeStopReason(openAiFinishReason);
    }

    /// <summary>
    /// 创建message_start事件
    /// </summary>
    public static AnthropicStreamDto CreateMessageStartEvent(string messageId, string model)
    {
        return new AnthropicStreamDto
        {
            Type = "message_start",
            Message = new AnthropicChatCompletionDto
            {
                id = messageId,
                type = "message",
                role = "assistant",
                model = model,
                content = new AnthropicChatCompletionDtoContent[0],
                Usage = new AnthropicCompletionDtoUsage
                {
                    InputTokens = 0,
                    OutputTokens = 0,
                    CacheCreationInputTokens = 0,
                    CacheReadInputTokens = 0
                }
            }
        };
    }

    /// <summary>
    /// 创建content_block_start事件
    /// </summary>
    public static AnthropicStreamDto CreateContentBlockStartEvent()
    {
        return new AnthropicStreamDto
        {
            Type = "content_block_start",
            Index = 0,
            ContentBlock = new AnthropicChatCompletionDtoContentBlock
            {
                Type = "text",
                Id = null,
                Name = null
            }
        };
    }

    /// <summary>
    /// 创建thinking block start事件
    /// </summary>
    public static AnthropicStreamDto CreateThinkingBlockStartEvent()
    {
        return new AnthropicStreamDto
        {
            Type = "content_block_start",
            Index = 0,
            ContentBlock = new AnthropicChatCompletionDtoContentBlock
            {
                Type = "thinking",
                Id = null,
                Name = null
            }
        };
    }

    /// <summary>
    /// 创建content_block_delta事件
    /// </summary>
    public static AnthropicStreamDto CreateContentBlockDeltaEvent(string text)
    {
        return new AnthropicStreamDto
        {
            Type = "content_block_delta",
            Index = 0,
            Delta = new AnthropicChatCompletionDtoDelta
            {
                Type = "text_delta",
                Text = text
            }
        };
    }

    /// <summary>
    /// 创建thinking delta事件
    /// </summary>
    public static AnthropicStreamDto CreateThinkingBlockDeltaEvent(string thinking)
    {
        return new AnthropicStreamDto
        {
            Type = "content_block_delta",
            Index = 0,
            Delta = new AnthropicChatCompletionDtoDelta
            {
                Type = "thinking",
                Thinking = thinking
            }
        };
    }

    /// <summary>
    /// 创建content_block_stop事件
    /// </summary>
    public static AnthropicStreamDto CreateContentBlockStopEvent()
    {
        return new AnthropicStreamDto
        {
            Type = "content_block_stop",
            Index = 0
        };
    }

    /// <summary>
    /// 创建message_delta事件
    /// </summary>
    public static AnthropicStreamDto CreateMessageDeltaEvent(string finishReason, AnthropicCompletionDtoUsage usage)
    {
        return new AnthropicStreamDto
        {
            Type = "message_delta",
            Usage = usage,
            Delta = new AnthropicChatCompletionDtoDelta
            {
                StopReason = finishReason
            }
        };
    }

    /// <summary>
    /// 创建message_stop事件
    /// </summary>
    public static AnthropicStreamDto CreateMessageStopEvent()
    {
        return new AnthropicStreamDto
        {
            Type = "message_stop"
        };
    }

    /// <summary>
    /// 创建tool block start事件
    /// </summary>
    public static AnthropicStreamDto CreateToolBlockStartEvent(string? toolId, string? toolName)
    {
        return new AnthropicStreamDto
        {
            Type = "content_block_start",
            Index = 0,
            ContentBlock = new AnthropicChatCompletionDtoContentBlock
            {
                Type = "tool_use",
                Id = toolId,
                Name = toolName
            }
        };
    }

    /// <summary>
    /// 创建tool delta事件
    /// </summary>
    public static AnthropicStreamDto CreateToolBlockDeltaEvent(string partialJson)
    {
        return new AnthropicStreamDto
        {
            Type = "content_block_delta",
            Index = 0,
            Delta = new AnthropicChatCompletionDtoDelta
            {
                Type = "input_json_delta",
                PartialJson = partialJson
            }
        };
    }

    /// <summary>
    /// 转换Anthropic消息为Thor消息列表
    /// </summary>
    public static List<ThorChatMessage> ConvertAnthropicMessageToThor(AnthropicMessageInput anthropicMessage)
    {
        var results = new List<ThorChatMessage>();

        // 处理简单的字符串内容
        if (anthropicMessage.Content != null)
        {
            var thorMessage = new ThorChatMessage
            {
                Role = anthropicMessage.Role,
                Content = anthropicMessage.Content
            };
            results.Add(thorMessage);
            return results;
        }

        // 处理多模态内容
        if (anthropicMessage.Contents is { Count: > 0 })
        {
            var currentContents = new List<ThorChatMessageContent>();
            var currentToolCalls = new List<ThorToolCall>();

            foreach (var content in anthropicMessage.Contents)
            {
                switch (content.Type)
                {
                    case "text":
                        currentContents.Add(ThorChatMessageContent.CreateTextContent(content.Text ?? string.Empty));
                        break;
                    case "thinking" when !string.IsNullOrEmpty(content.Thinking):
                        results.Add(new ThorChatMessage()
                        {
                            ReasoningContent = content.Thinking
                        });
                        break;
                    case "image":
                    {
                        if (content.Source != null)
                        {
                            var imageUrl = content.Source.Type == "base64"
                                ? $"data:{content.Source.MediaType};base64,{content.Source.Data}"
                                : content.Source.Data;
                            currentContents.Add(ThorChatMessageContent.CreateImageUrlContent(imageUrl ?? string.Empty));
                        }

                        break;
                    }
                    case "tool_use":
                    {
                        // 如果有普通内容，先创建内容消息
                        if (currentContents.Count > 0)
                        {
                            if (currentContents.Count == 1 && currentContents.Any(x => x.Type == "text"))
                            {
                                var contentMessage = new ThorChatMessage
                                {
                                    Role = anthropicMessage.Role,
                                    ContentCalculated = currentContents.FirstOrDefault()?.Text ?? string.Empty
                                };
                                results.Add(contentMessage);
                            }
                            else
                            {
                                var contentMessage = new ThorChatMessage
                                {
                                    Role = anthropicMessage.Role,
                                    Contents = currentContents
                                };
                                results.Add(contentMessage);
                            }

                            currentContents = new List<ThorChatMessageContent>();
                        }

                        // 收集工具调用
                        var toolCall = new ThorToolCall
                        {
                            Id = content.Id,
                            Type = "function",
                            Function = new ThorChatMessageFunction
                            {
                                Name = content.Name,
                                Arguments = JsonSerializer.Serialize(content.Input)
                            }
                        };
                        currentToolCalls.Add(toolCall);
                        break;
                    }
                    case "tool_result":
                    {
                        // 如果有普通内容，先创建内容消息
                        if (currentContents.Count > 0)
                        {
                            var contentMessage = new ThorChatMessage
                            {
                                Role = anthropicMessage.Role,
                                Contents = currentContents
                            };
                            results.Add(contentMessage);
                            currentContents = [];
                        }

                        // 如果有工具调用，先创建工具调用消息
                        if (currentToolCalls.Count > 0)
                        {
                            var toolCallMessage = new ThorChatMessage
                            {
                                Role = anthropicMessage.Role,
                                ToolCalls = currentToolCalls
                            };
                            results.Add(toolCallMessage);
                            currentToolCalls = new List<ThorToolCall>();
                        }

                        // 创建工具结果消息
                        var toolMessage = new ThorChatMessage
                        {
                            Role = "tool",
                            ToolCallId = content.ToolUseId,
                            Content = content.Content?.ToString() ?? string.Empty
                        };
                        results.Add(toolMessage);
                        break;
                    }
                }
            }

            // 处理剩余的内容
            if (currentContents.Count > 0)
            {
                var contentMessage = new ThorChatMessage
                {
                    Role = anthropicMessage.Role,
                    Contents = currentContents
                };
                results.Add(contentMessage);
            }

            // 处理剩余的工具调用
            if (currentToolCalls.Count > 0)
            {
                var toolCallMessage = new ThorChatMessage
                {
                    Role = anthropicMessage.Role,
                    ToolCalls = currentToolCalls
                };
                results.Add(toolCallMessage);
            }
        }

        // 如果没有任何内容，返回一个空的消息
        if (results.Count == 0)
        {
            results.Add(new ThorChatMessage
            {
                Role = anthropicMessage.Role,
                Content = string.Empty
            });
        }

        // 如果只有一个text则使用content字段
        if (results is [{ Contents.Count: 1 }] &&
            results.FirstOrDefault()?.Contents?.FirstOrDefault()?.Type == "text" &&
            !string.IsNullOrEmpty(results.FirstOrDefault()?.Contents?.FirstOrDefault()?.Text))
        {
            return
            [
                new ThorChatMessage
                {
                    Role = results[0].Role,
                    Content = results.FirstOrDefault()?.Contents?.FirstOrDefault()?.Text ?? string.Empty
                }
            ];
        }

        return results;
    }

    /// <summary>
    /// 转换Anthropic工具为Thor工具
    /// </summary>
    public static ThorToolDefinition ConvertAnthropicToolToThor(AnthropicMessageTool anthropicTool)
    {
        IDictionary<string, ThorToolFunctionPropertyDefinition> values =
            new Dictionary<string, ThorToolFunctionPropertyDefinition>();

        if (anthropicTool.InputSchema?.Properties != null)
        {
            foreach (var property in anthropicTool.InputSchema.Properties)
            {
                if (property.Value?.description != null)
                {
                    var definitionType = new ThorToolFunctionPropertyDefinition()
                    {
                        Description = property.Value.description,
                        Type = property.Value.type
                    };
                    if (property.Value?.items?.type != null)
                    {
                        definitionType.Items = new ThorToolFunctionPropertyDefinition()
                        {
                            Type = property.Value.items.type
                        };
                    }

                    values.Add(property.Key, definitionType);
                }
            }
        }


        return new ThorToolDefinition
        {
            Type = "function",
            Function = new ThorToolFunctionDefinition
            {
                Name = anthropicTool.name,
                Description = anthropicTool.Description,
                Parameters = new ThorToolFunctionPropertyDefinition
                {
                    Type = anthropicTool.InputSchema?.Type ?? "object",
                    Properties = values,
                    Required = anthropicTool.InputSchema?.Required
                }
            }
        };
    }

    /// <summary>
    /// 将OpenAI的完成原因转换为Claude的停止原因
    /// </summary>
    public static string GetClaudeStopReason(string? openAIFinishReason)
    {
        return openAIFinishReason switch
        {
            "stop" => "end_turn",
            "length" => "max_tokens",
            "tool_calls" => "tool_use",
            "content_filter" => "stop_sequence",
            _ => "end_turn"
        };
    }

    /// <summary>
    /// 将OpenAI响应转换为Claude响应格式
    /// </summary>
    public static AnthropicChatCompletionDto ConvertOpenAIToClaude(ThorChatCompletionsResponse openAIResponse,
        AnthropicInput originalRequest)
    {
        var claudeResponse = new AnthropicChatCompletionDto
        {
            id = openAIResponse.Id,
            type = "message",
            role = "assistant",
            model = openAIResponse.Model ?? originalRequest.Model,
            stop_reason = GetClaudeStopReason(openAIResponse.Choices?.FirstOrDefault()?.FinishReason),
            stop_sequence = "",
            content = []
        };

        if (openAIResponse.Choices is { Count: > 0 })
        {
            var choice = openAIResponse.Choices.First();
            var contents = new List<AnthropicChatCompletionDtoContent>();

            if (!string.IsNullOrEmpty(choice.Message.Content) && !string.IsNullOrEmpty(choice.Message.ReasoningContent))
            {
                contents.Add(new AnthropicChatCompletionDtoContent
                {
                    type = "thinking",
                    Thinking = choice.Message.ReasoningContent
                });

                contents.Add(new AnthropicChatCompletionDtoContent
                {
                    type = "text",
                    text = choice.Message.Content
                });
            }
            else
            {
                // 处理思维内容
                if (!string.IsNullOrEmpty(choice.Message.ReasoningContent))
                    contents.Add(new AnthropicChatCompletionDtoContent
                    {
                        type = "thinking",
                        Thinking = choice.Message.ReasoningContent
                    });

                // 处理文本内容
                if (!string.IsNullOrEmpty(choice.Message.Content))
                    contents.Add(new AnthropicChatCompletionDtoContent
                    {
                        type = "text",
                        text = choice.Message.Content
                    });
            }

            // 处理工具调用
            if (choice.Message.ToolCalls is { Count: > 0 })
                contents.AddRange(choice.Message.ToolCalls.Select(toolCall => new AnthropicChatCompletionDtoContent
                {
                    type = "tool_use", id = toolCall.Id, name = toolCall.Function?.Name,
                    input = JsonSerializer.Deserialize<object>(toolCall.Function?.Arguments ?? "{}")
                }));

            claudeResponse.content = contents.ToArray();
        }

        // 处理使用情况统计 - 确保始终提供Usage信息
        claudeResponse.Usage = new AnthropicCompletionDtoUsage
        {
            InputTokens = openAIResponse.Usage?.PromptTokens ?? 0,
            OutputTokens = (int?)(openAIResponse.Usage?.CompletionTokens ?? 0),
            CacheCreationInputTokens = openAIResponse.Usage?.PromptTokensDetails?.CachedTokens ?? 0,
            CacheReadInputTokens = openAIResponse.Usage?.PromptTokensDetails?.CachedTokens ?? 0
        };

        return claudeResponse;
    }


    /// <summary>
    /// 转换Anthropic工具选择为Thor工具选择
    /// </summary>
    public static ThorToolChoice ConvertAnthropicToolChoiceToThor(AnthropicTooChoiceInput anthropicToolChoice)
    {
        return new ThorToolChoice
        {
            Type = anthropicToolChoice.Type ?? "auto",
            Function = anthropicToolChoice.Name != null
                ? new ThorToolChoiceFunctionTool { Name = anthropicToolChoice.Name }
                : null
        };
    }
}
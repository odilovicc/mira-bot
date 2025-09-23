import { ILLMClient, IBotTransport, IAnswerService } from '../../domain/services';
import { Question, Answer, ChatContext } from '../../domain/models';
import { logger } from '../../utils/logger';

export class HandleQuestionUseCase implements IAnswerService {
  constructor(
    private readonly llmClient: ILLMClient,
    private readonly botTransport: IBotTransport
  ) {}

  async handleQuestion(question: Question, context: ChatContext): Promise<Answer> {
    const startTime = Date.now();
    logger.info(
      { 
        userId: context.userId, 
        chatId: context.chatId, 
        questionLength: question.text.length 
      }, 
      'Handling question'
    );

    try {
      await this.botTransport.showTyping(context.chatId);

      const llmResponse = await this.llmClient.ask(question.text);
      
      const answer: Answer = {
        text: llmResponse.content,
        timestamp: new Date(),
        model: llmResponse.model,
      };

      await this.botTransport.sendMessage(context.chatId, answer.text);
      return answer;

    } catch (error) {
      const duration = Date.now() - startTime;
      logger.error(
        { 
          error, 
          userId: context.userId, 
          chatId: context.chatId, 
          duration 
        }, 
        'Failed to handle question'
      );

      const errorMessage = 'Извините, произошла ошибка при обработке вашего сообщения. Попробуйте позже.';
      
      try {
        await this.botTransport.sendMessage(context.chatId, errorMessage);
      } catch (sendError) {
        logger.error({ error: sendError, chatId: context.chatId }, 'Failed to send error message');
      }

      return {
        text: errorMessage,
        timestamp: new Date(),
        model: 'error',
      };
    }
  }
}
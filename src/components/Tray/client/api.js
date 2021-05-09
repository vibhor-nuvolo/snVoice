import { getClient } from './ClientWrapper';

export const translateTranscript = async (transcript, language) => {
  const payload = {
    target_language: 'fr',
    source_language_message: transcript,
  };
  const endpoint = '/api/393015/translation_service/getTranslatedText';
  return await getClient().post(endpoint, payload);
};

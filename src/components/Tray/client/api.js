import { getClient } from './ClientWrapper';

export const translateTranscript = async (transcript, language) => {
  const payload = {
    target_language: language,
    source_language_message: transcript,
  };
  const endpoint = '/api/x_snc_now_mobile_d/translation_service/getTranslatedText';
  return await getClient().post(endpoint, payload);
};

export const getLanguage = async() =>{
  const endpoint = '/api/x_snc_now_mobile_d/translation_service/getUserLanguage';
  return await getClient().get(endpoint);
}
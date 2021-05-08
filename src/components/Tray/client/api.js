import { getClient } from "./ClientWrapper";

export const testapi = async ()=> {
  const endpoint =
    "/api/x_nuvo_sn_voice/servicenow_voice/test";
  return await getClient().get(endpoint);
};

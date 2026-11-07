import BoopFace, { VERSION, SKIN_NAMES, connectAgent, type BoopFaceAction } from 'boopface/lite';

const avatar = new BoopFace();
const action: BoopFaceAction = 'love';
avatar.play(action);
const version: string = VERSION;
void version;
// @ts-expect-error the lite build has no skin catalog to use
void SKIN_NAMES;
void connectAgent(avatar).handle('done');

import { characterLinksRender } from "./views/characterLinksRender.tsx";
import * as kanka from "./kanka.ts";
import * as tags from "./tags.ts";

export async function setup(
  campaignId: number,
): Promise<number> {
  const entities: kanka.KankaEntity[] = [];

  const kankaTags = await kanka.getTagsByName(campaignId, tags.Player.name);

  if (kankaTags.data.length > 0) {
    for (let index = 0; index < kankaTags.data[0].entities.length; index++) {
      const entity = await kanka.getEntity(
        campaignId,
        kankaTags.data[0].entities[index],
      );
      if (entity.data) {
        entities.push(entity.data);
      }
    }

    if (entities.length > 0) {
      const note: kanka.KankaNoteBody = {
        name: tags.CharacterLinks,
        entry: await characterLinksRender(entities, campaignId).render(),
      };

      const notes = await kanka.getNotesByName(campaignId, note.name);

      if (notes.data.length > 0) {
        await kanka.updateNote(campaignId, notes.data[0].id, note);
      } else {
        await kanka.createNote(campaignId, note);
      }
    }
  }

  return entities.length;
}

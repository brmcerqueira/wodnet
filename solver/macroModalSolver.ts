import { macroButton, ModalInput } from "../custom/module.ts";
import { Chronicle, getMacro, saveMacro } from "../repository.ts";
import {
  Interaction,
  InteractionResponseType,
  Message,
  MessageComponentType,
  ts,
  User,
} from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { colors } from "../utils.ts";
import {
  compilerOptions,
  macro as macroF,
  MacroCompilerHost,
  includeFileTransformer,
} from "../macro.ts";
import { logger } from "../logger.ts";
import { ActionResult, Character, CharacterMode } from "../character.ts";

export async function macroModalSolver(
  interaction: Interaction,
  _chronicle: Chronicle,
  input: ModalInput<{ buttons: string; code: string }>,
) {
  const messageId = input.context[0];
  const macro = (await getMacro(messageId))!;

  macro.buttons = input.fields.buttons.split("\n");

  const host = new MacroCompilerHost(input.fields.code);

  const program = ts.createProgram(
    [host.root.fileName],
    compilerOptions,
    host,
  );

  const diagnostics = ts.getPreEmitDiagnostics(program);

  if (diagnostics.length > 0) {
    diagnostics.forEach((diagnostic) => {
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n",
      );
      const { line, character } =
        diagnostic.file?.getLineAndCharacterOfPosition(diagnostic.start!) ?? {};
      logger.error(
        `file: ${diagnostic.file?.fileName}, line: ${line}, column: ${character} -> ${message}`,
      );
    });
  } else {
    program.emit(undefined, undefined, undefined, undefined, {
      before: [includeFileTransformer()],
      after: [],
    });

    macro.code = input.fields.code;
    macro.transpiled = host.transpiled;

    await saveMacro(macro);

    const func = macroF(macro.transpiled);

    const character: Character = {
      id: "",
      details: "",
      image: "",
      name: "",
      player: "",
      resonance: "",
      ambition: "",
      desire: "",
      predator: "",
      clan: "",
      generation: 0,
      mode: CharacterMode.Opened,
      versionstamp: crypto.randomUUID(),
      attributes: {
        physical: {
          strength: 0,
          dexterity: 0,
          stamina: 0,
        },
        social: {
          charisma: 0,
          manipulation: 0,
          composure: 0,
        },
        mental: {
          intelligence: 0,
          wits: 0,
          resolve: 0,
        },
      },
      skills: {
        physical: {
          athletics: 0,
          brawl: 0,
          craft: 0,
          drive: 0,
          firearms: 0,
          melee: 0,
          larceny: 0,
          stealth: 0,
          survival: 0,
        },
        social: {
          animalKen: 0,
          etiquette: 0,
          insight: 0,
          intimidation: 0,
          leadership: 0,
          performance: 0,
          persuasion: 0,
          streetwise: 0,
          subterfuge: 0,
        },
        mental: {
          academics: 0,
          awareness: 0,
          finance: 0,
          investigation: 0,
          medicine: 0,
          occult: 0,
          politics: 0,
          science: 0,
          technology: 0,
        },
      },
      health: {
        superficial: 0,
        aggravated: 0,
        penalty: 0,
      },
      willpower: {
        superficial: 0,
        aggravated: 0,
        penalty: 0,
      },
      humanity: {
        total: 0,
        stains: 0,
      },
      bloodPotency: 0,
      hunger: 0,
      experience: {
        total: 0,
        spent: 0,
      },
      specialties: {},
      advantages: {},
      flaws: {},
      disciplines: {},
    };

    const result: ActionResult = {
      dices: 0,
      difficulty: 0,
      modifier: 0,
    };

    func(character, result, 0);

    const message = new Message(
      interaction.client,
      macro.message,
      interaction.channel!,
      new User(interaction.client, macro.message.author),
    );

    await message.edit({
      components: [{
        type: MessageComponentType.ACTION_ROW,
        components: macro.buttons.map((label, index) =>
          macroButton(
            {
              label: label,
            },
            messageId,
            index,
          )
        ),
      }],
    });

    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.commands.macro.saved,
        color: colors.green,
      }],
      ephemeral: true,
    });
  }
}

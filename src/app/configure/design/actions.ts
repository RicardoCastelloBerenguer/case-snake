"use server";

import { db } from "@/db";
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from "@prisma/client";

export type SaveConfigArgs = {
  caseColor: CaseColor;
  finish: CaseFinish;
  caseMaterial: CaseMaterial;
  model: PhoneModel;
  configId: string;
};

export async function saveConfig({
  caseColor,
  finish,
  caseMaterial,
  model,
  configId,
}: SaveConfigArgs) {
  await db.configuration.update({
    where: { id: configId },
    data: { caseColor, finish, caseMaterial, model },
  });
}

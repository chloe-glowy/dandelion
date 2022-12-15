import { Document, Model, UpdateQuery } from 'mongoose';
import { MongodbAidRequestRecord } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import type { Options } from 'src/server/scripts/helpers/script-update-options';

type ObjectDetails<T> = {
  objectTypeName: string;
  model: Model<T>;
};

export async function updateObjectForScript<T>(
  object: Document<T>,
  updates: UpdateQuery<MongodbAidRequestRecord>,
  { isDryRun, logOnChange, model, objectTypeName }: Options & ObjectDetails<T>,
): Promise<Document<T> | null> {
  if (isDryRun || logOnChange) {
    console.log(
      `[${
        isDryRun ? 'DRY RUN' : 'LIVE RUN'
      }] Making the following updates to ${objectTypeName} ID ${object._id?.toString()}:`,
    );
    for (const key in updates) {
      if (key.startsWith('$') || key.includes('.')) {
        console.log(`  ${JSON.stringify(updates)}`);
        continue;
      }
      const newValue = updates[key];
      const oldValue = object[key as keyof Document<T>];
      if (newValue?.valueOf() !== oldValue?.valueOf()) {
        console.log(`  ${key}: ${oldValue} -> ${newValue}`);
      }
    }
  }
  if (!isDryRun) {
    return await model.findByIdAndUpdate(object._id, updates, {
      new: true,
    });
  }
  return object;
}

import { PrismaClient } from '@prisma/client';
import { Options, parse } from 'csv-parse';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { finished } from 'node:stream/promises';

interface IReservationRecord {
  id: number;
  amenityId: number;
  userId: number;
  startTime: number;
  endTime: number;
  date: bigint;
}

interface IAmenityRecord {
  id: number;
  name: string;
}

const prisma = new PrismaClient();
async function main() {
  const pathAmenity = path.resolve(__dirname, '..', 'csv', 'amenity.csv');
  const pathReservations = path.resolve(
    __dirname,
    '..',
    'csv',
    'reservations.csv',
  );
  const parserOptions = {
    delimiter: ';',
    skip_empty_lines: true,
    columns: true,
    trim: true,
    cast: true,
  };

  const processFile = async <T = unknown>(
    path: string,
    parserOptions: Options,
  ): Promise<T[]> => {
    const records: T[] = [];
    const streem = fs.createReadStream(path);
    const parser = streem.pipe(parse(parserOptions));
    parser.on('readable', function () {
      let record: T;
      while ((record = parser.read()) !== null) {
        records.push(record);
      }
    });
    await finished(parser);

    return records;
  };

  const reservationsColumns = [
    'id',
    'amenityId',
    'userId',
    'startTime',
    'endTime',
    'date',
  ];

  const [amenities, reservations] = await Promise.all([
    processFile<IAmenityRecord>(pathAmenity, parserOptions),
    processFile<IReservationRecord>(pathReservations, {
      ...parserOptions,
      columns: reservationsColumns,
      fromLine: 2,
    }),
  ]);

  await prisma.amenity.createMany({
    data: amenities,
    skipDuplicates: true,
  });

  await prisma.reservation.createMany({
    data: reservations,
    skipDuplicates: true,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

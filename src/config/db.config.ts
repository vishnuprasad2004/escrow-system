import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getDatabaseConfig = (): MongooseModuleOptions => {
  const dbUri = 'mongodb://localhost:27017/nest';
  return {
    uri: dbUri,
  };
};

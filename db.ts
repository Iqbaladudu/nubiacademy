import Dexie, { type EntityTable } from "dexie";

interface User {
  id: string;
  fullname: string;
  username: string;
  phone: string;
  province?: string;
  regency?: string;
  startDate?: string;
  endDate?: string;
  subscription_status?: string;
  email: string;
}

// interface Category {
//   value: {
//     id: string;
//     name: string;
//     createdAt: string;
//     updatedAt: string;
//   };
// }

// interface Thumbnail {
//   id: string;
//   name: string;
//   filename: string;
//   width: number;
//   height: number;
//   url: string;
// }

// interface Attachment {
//   id: string;
//   name: string;
//   filename: string;
//   url: string;
// }

// interface ModuleContent {
//   title: string;
//   allow_preview: string;
//   content: string;
//   video_url: string;
//   attachment: Attachment;
//   id: string;
// }

// interface Module {
//   module_name: string;
//   module_content: ModuleContent[];
//   id: string;
// }

// interface Course {
//   id: string;
//   name: string;
//   slug: string;
//   description: string;
//   price: number;
//   subscription_allowed: string;
//   category: Category;
//   duration: number;
//   level: string;
//   thumbnail: Thumbnail;
//   createdAt: string;
//   updatedAt: string;
//   contents_module: Module[];
// }

const db = new Dexie("nubiacademy-db") as Dexie & {
  user: EntityTable<User>;
  // courses: EntityTable<Course[]>;
};

// Schema declaration:
db.version(1).stores({
  user: "id, fullname, username, phone, dateofbirth, province, regency, startDate, endDate, subscription_status, email",
});

export type { User };
export { db };

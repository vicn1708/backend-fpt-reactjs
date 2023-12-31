import {
  Firestore,
  WhereFilterOp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import * as _ from 'lodash';

export class FireStoreRepository {
  private db: Firestore;
  private collectionName: string;
  private result: any[] | any;

  constructor(collectionName: string, db: Firestore) {
    this.collectionName = collectionName;
    this.db = db;
  }

  select(fields: string) {
    const selected = async () => {
      const selectedFields = fields
        .trim()
        .split(' ')
        .map((f) => f.trim());

      const data = await this.result;

      if (Array.isArray(data)) {
        const p: any[] = data;

        const result = p.map((item) => {
          const selectedData = {};

          for (const field of selectedFields) {
            if (item.hasOwnProperty(field)) selectedData[field] = item[field];
          }

          return selectedData;
        });

        return result;
      } else {
        const selectedData = {};

        for (const field of selectedFields) {
          if (data.hasOwnProperty(field)) selectedData[field] = data[field];
        }

        return selectedData;
      }
    };

    this.result = selected();

    return this;
  }

  findAll() {
    const findAllDoc = async (): Promise<any[]> => {
      const result: any[] = [];

      const querySnapshot = await getDocs(
        collection(this.db, this.collectionName),
      );
      querySnapshot.forEach((doc) =>
        result.push({ id: doc.id, ...doc.data() }),
      );

      return result;
    };

    this.result = findAllDoc();

    return this;
  }

  findById(docId: string) {
    const findDocById = async () => {
      const docRef = doc(this.db, this.collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        // docSnap.data() will be undefined in this case
        return undefined;
      }
    };

    this.result = findDocById();

    return this;
  }

  find(queryDoc: { field: string; value: any; compare?: WhereFilterOp }) {
    const findDoc = async () => {
      const compare: WhereFilterOp = queryDoc.compare ? queryDoc.compare : '==';
      const q = query(
        collection(this.db, this.collectionName),
        where(queryDoc.field, compare, queryDoc.value),
      );
      const result: any[] = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>
        result.push({ id: doc.id, ...doc.data() }),
      );

      if (result.length > 1) {
        return result;
      } else {
        return result[0];
      }
    };

    this.result = findDoc();

    return this;
  }

  async create(payload: any) {
    payload.createdAt = new Date().toISOString();
    payload.updatedAt = new Date().toISOString();

    const newData = await addDoc(collection(this.db, this.collectionName), {
      ...payload,
    });

    const newDoc = await this.findById(newData.id).execute();

    return newDoc;
  }

  async updateById(docId: string, data: any) {
    data.updatedAt = new Date().toISOString();

    const docRef = doc(this.db, this.collectionName, docId);

    await updateDoc(docRef, _.toPlainObject(data));

    return await this.findById(docId).execute();
  }

  async deleteById(docId: string) {
    return await deleteDoc(doc(this.db, this.collectionName, docId));
  }

  async execute() {
    return await this.result;
  }
}

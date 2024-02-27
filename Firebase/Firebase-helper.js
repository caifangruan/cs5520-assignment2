import {
    collection,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
  } from "firebase/firestore";
  import { db } from "./Firebase-setup";
  
  /**
   * This is the function to add item to firestore
   * @param data: the data that will be written to firestore
   */
  export async function writeToDB(data) {
    // Add a new document with a generated id.
    //replace db with the firestore variable exported in firebase-setup
    try {
      await addDoc(collection(db, "activities"), data);
    } catch (err) {
      console.log("error");
    }
  }
  
  /**
   * This is the function to delete the item from firestore
   * @param data: the id of data that will be referenced for deletion
   */
  export async function deletefromDB(deleteId) {
    try {
      await deleteDoc(doc(db, "activities", deleteId));
    } catch (err) {
      console.log("error");
    }
  }
  
  /**
   * This is the function to update the item from firestore
   * @param id: the id of data that will be referenced for update
   * @param status: the status input for the field
   */
  
  export async function updateDB(id, activityType, duration, date, isSpecial) {
    try {
      await updateDoc(doc(db, "activities", id), {
        activityType: activityType,
        duration: duration,
        date: date,
        isSpecial: isSpecial
      });
    } catch (err) {
      console.log("error");
    }
  }
  
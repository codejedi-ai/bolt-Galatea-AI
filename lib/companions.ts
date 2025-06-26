import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore"
import { db } from "./firebase"

export interface AICompanion {
  id?: string
  name: string
  age: number
  personality: string
  interests: string[]
  bio: string
  imageUrl: string
  compatibilityScore?: number
  personalityTraits: string[]
  communicationStyle: string
  learningCapacity: string
  backstory: string
  favoriteTopics: string[]
  relationshipGoals: string[]
  createdAt?: Date
  updatedAt?: Date
}

export async function getAllCompanions(): Promise<AICompanion[]> {
  try {
    const companionsRef = collection(db, "companions")
    const q = query(companionsRef, orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as AICompanion[]
  } catch (error) {
    console.error("Error fetching companions:", error)
    throw new Error("Failed to fetch companions")
  }
}

export async function getCompanionById(id: string): Promise<AICompanion | null> {
  try {
    const docRef = doc(db, "companions", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate(),
        updatedAt: docSnap.data().updatedAt?.toDate(),
      } as AICompanion
    }

    return null
  } catch (error) {
    console.error("Error fetching companion:", error)
    throw new Error("Failed to fetch companion")
  }
}

export async function createCompanion(companion: Omit<AICompanion, "id" | "createdAt" | "updatedAt">): Promise<string> {
  try {
    const companionsRef = collection(db, "companions")
    const docRef = await addDoc(companionsRef, {
      ...companion,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return docRef.id
  } catch (error) {
    console.error("Error creating companion:", error)
    throw new Error("Failed to create companion")
  }
}

export async function updateCompanion(id: string, updates: Partial<AICompanion>): Promise<void> {
  try {
    const docRef = doc(db, "companions", id)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    })
  } catch (error) {
    console.error("Error updating companion:", error)
    throw new Error("Failed to update companion")
  }
}

export async function deleteCompanion(id: string): Promise<void> {
  try {
    const docRef = doc(db, "companions", id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting companion:", error)
    throw new Error("Failed to delete companion")
  }
}

export async function getRandomCompanions(count = 10): Promise<AICompanion[]> {
  try {
    const companions = await getAllCompanions()

    // Shuffle the array and return the requested number
    const shuffled = companions.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  } catch (error) {
    console.error("Error fetching random companions:", error)
    throw new Error("Failed to fetch random companions")
  }
}

import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { storage } from "./firebase"
import { updateProfile } from "firebase/auth"
import type { User } from "firebase/auth"

export async function uploadProfilePicture(user: User, file: File): Promise<string> {
  try {
    // Create a reference to the file location
    const fileExtension = file.name.split(".").pop()
    const fileName = `profile-pictures/${user.uid}.${fileExtension}`
    const storageRef = ref(storage, fileName)

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file)

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref)

    // Update the user's profile with the new photo URL
    await updateProfile(user, {
      photoURL: downloadURL,
    })

    return downloadURL
  } catch (error) {
    console.error("Error uploading profile picture:", error)
    throw new Error("Failed to upload profile picture")
  }
}

export async function deleteProfilePicture(user: User): Promise<void> {
  try {
    if (user.photoURL) {
      // Extract the file path from the URL
      const url = new URL(user.photoURL)
      const pathMatch = url.pathname.match(/\/o\/(.+)\?/)
      if (pathMatch) {
        const filePath = decodeURIComponent(pathMatch[1])
        const storageRef = ref(storage, filePath)
        await deleteObject(storageRef)
      }
    }

    // Update the user's profile to remove the photo URL
    await updateProfile(user, {
      photoURL: null,
    })
  } catch (error) {
    console.error("Error deleting profile picture:", error)
    throw new Error("Failed to delete profile picture")
  }
}

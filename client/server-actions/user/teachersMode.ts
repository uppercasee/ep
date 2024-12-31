export async function updateTeachersMode(teachersMode: boolean) {
  //TODO: change through db and also clerk roles
  console.log('Teachers Mode updated:', teachersMode)
  return !teachersMode
}

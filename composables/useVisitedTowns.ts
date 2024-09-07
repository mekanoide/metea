import { useStorage } from '@vueuse/core'

export function useVisitedTowns() {
  type Town = {
    id: string;
    name: string
    province: string
  }

  const storage = useStorage<Town[]>('towns', [])

  async function saveVisitedTown(town: Town) {
    let towns = storage.value
    // Check there's not already an item with the same id
    if (towns.length > 0) {
      towns = towns.filter((item) => item.id !== town.id)
    }

    towns = [town, ...towns]

    // Limit list to 10 items
    if (towns.length > 10) {
      towns = towns.slice(0, 10)
    }

    // Add the town to the beginning of the list
    storage.value = towns
  }

  /**
   * Gets list of visited towns from the storage.
   *
   * @returns {Array<Town>} List of visited towns.
   */
  function getVisitedTowns(): Town[] {
    return storage.value
  }

  return {
    getVisitedTowns,
    saveVisitedTown
  }
}

import toast from "react-hot-toast";

export function load(item) {
  return localStorage.getItem(item)
    ? JSON.parse(localStorage.getItem(item))
    : [];
}

export function save(list, item) {
  const oldList = localStorage.getItem(item)
    ? JSON.parse(localStorage.getItem(item))
    : [];

  const ONE_DAY_MS = 60 * 1000; // Millisecondes dans 10 minutes

  if (item === "history") {
    // Vérifier si un élément avec le même nom existe à moins de 10 minutes
    const existsRecent = oldList.find(
      (el) =>
        el.name === list.name &&
        Math.abs(new Date(list.date) - new Date(el.date)) < ONE_DAY_MS
    );
    if (existsRecent) return;
  } else {
    // Vérifier juste par nom pour les autres listes
    if (oldList.find((el) => el.name === list.name)) {
      toast.error(`${list.name} est déjà dans la liste des favoris !`);
      return;
    }
  }

  // Limiter à 10 éléments
  if (oldList.length >= 10) oldList.pop();

  const newList = [list, ...oldList];
  localStorage.setItem(item, JSON.stringify(newList));
  toast.success(`${list.name} ajoutée aux ${item} !`, "success");
}

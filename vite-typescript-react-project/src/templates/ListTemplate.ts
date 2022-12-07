import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  static instance: ListTemplate = new ListTemplate();
  ul: HTMLUListElement;

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }
  clear(): void {
    this.ul.innerHTML = "";
  }

  render(fullList: FullList): void {
    this.clear();
    fullList.list.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      const inp = document.createElement("input") as HTMLInputElement;
      inp.type = "checkbox";
      inp.id = item.id;
      inp.tabIndex = 0;
      inp.checked = item.checked;
      inp.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.save();
      });

      const lab = document.createElement("label") as HTMLLabelElement;
      lab.htmlFor = item.id;
      lab.textContent = `${item.item}`;

      const btn = document.createElement("button") as HTMLButtonElement;
      btn.textContent = "X";
      btn.className = "button";
      btn.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      li.append(inp, lab, btn);

      this.ul.append(li);
    });
  }
}

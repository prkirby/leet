export function printList(list) {
    if (!list)
        return;
    let str = `[${list.val}`;
    while (list.next) {
        list = list.next;
        str += `, ${list.val}`;
    }
    console.log(str + ']');
}

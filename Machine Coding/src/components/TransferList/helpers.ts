import { List } from "./types";

export const formatListItem = (itemList: string[], listType: boolean): List => {
    return itemList?.map(item => ({
        value: item,
        listType,
        isSelected: false
    }));
}

export const invertListItemSelection = (prevList: List, itemIndex: number) => {
    const prevListCopy = [...prevList];
    prevListCopy[itemIndex] = {
        ...prevListCopy[itemIndex],
        isSelected: !prevListCopy[itemIndex].isSelected,
    };
    return prevListCopy;
}

export const invertListItemType = (prevList: List) => {
    return prevList?.map((listItem) => ({
        ...listItem,
        listType: !listItem.listType,
      }));
}

export const getSelectedItemCount = (list: List) => {
    return list?.filter(listItem => listItem.isSelected)?.length || 0;
}

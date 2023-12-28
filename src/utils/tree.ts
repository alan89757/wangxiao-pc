export function flatList(list:any, type:any) {
    return list.map((item:any) => {
      let { next = [], units = [] } = item;
      if (next.length > 0) {
        next = next.map((it:any) => {
          let { next = [], units = [] } = it;
          if (next.length > 0) {
            next = flatList(next, 2);
          }
          return {
            ...it,
            type,
            next: next.concat(
              units.map((item:any) => {
                return { ...item, isUnit: true };
              })
            ),
          };
        });
      }
      return {
        ...item,
        type,
        next: next.concat(
          units.map((item:any) => {
            return { ...item, isUnit: true };
          })
        ),
      };
    });
  }
  
  // 0 - 1
  // 1  - 0
  // 2 -4
  // 3 - 2
  export const tabEnum = {
    0: 1,
    1: 0,
    2: 4,
    3: 2,
  };
  
  // 搜集产品的id
  export function getProductIds(data:any, type = 'P') {
    const result: any[] = [];
    function handleData(ids:any) {
      if (Object.keys(ids).length > 0) {
        ids?.forEach((item:any) => {
          const { id = '', nodeType = '', next = [] } = item;
          if (nodeType.toUpperCase() === type) {
            result.push(id);
          }
          if (next && next.length > 0) {
            handleData(next);
          }
        });
      }
    }
    handleData(data);
    return result;
  }
  
  // 产品树重新组装统计数据
  export function assembleData(item:any, statics:any) {
    const current = statics?.find((it:any) => {
      // J-科目类型 P-产品类型 C-章类型 S-节类型 CU-学习单元类型(章) SU-学习单元类型(节)
      // console.log(item.id === it.id && it.nodeType === item.nodeType)
      // nodeType=== CU 和SU   nodetype和id匹配
      // nodeType=== S  nodeType和parentName和name匹配
      // nodeType=== C  nodeType和productId和name匹配
      // nodeType=== p  nodeType和parentId存在，parentId和id一起匹配，不存在直接用id匹配
      switch (item.nodeType) {
        case 'CU':
        case 'SU':
          if (item.id === it.id && item.nodeType === it.nodeType) {
            return true;
          }
          break;
        case 'S':
          if (
            item.name === it.name &&
            item.nodeType === it.nodeType &&
            item.parentName === it.parentName
          ) {
            return true;
          }
          break;
        case 'C':
          if (
            item.name === it.name &&
            item.nodeType === it.nodeType &&
            item.parentId === it.parentId
          ) {
            return true;
          }
          break;
        case 'P':
          if (item.id === it.id && item.nodeType === it.nodeType) {
            return true;
          }
          break;
        default:
          return false;
      }
    });
    if (current) {
      return {
        ...item,
        ...current,
      };
    } else {
      return item;
    }
  }
  
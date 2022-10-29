react-query dome 实操

```
import { useEffect, useState } from "react";
import { getList, getDetails, changeFile } from "./my-api";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
  useMutation
} from "@tanstack/react-query";


import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function App1() {
  const [data, updateData] = useState(null);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setError(false);
    setLoading(true);

    try {
      const data = await getDetails();
      console.log("data", data);
      updateData(data);
    } catch (e) {
      setError(true);
    }

    setLoading(false);
  }, []);

  return (
    <div>
      <div>{data ? data.data.name : null}</div>
      <div>{isError ? "error" : null}</div>
      <div>{isLoading ? "Loading" : null}</div>
    </div>
  );
}

/**
 *
1. useQuery 查询数据
isLoading 或者 status === 'loading' - 查询暂时还没有数据
isError 或者 status === 'error' - 查询遇到一个错误
isSuccess 或者 status === 'success' - 查询成功，并且数据可用
除了这些主要状态之外，取决于具体查询的状态，还有更多信息可用：

error - 如果查询处于isError状态，则可以通过error属性获取该错误
data - 如果查询处于success状态，则可以通过data属性获得数据

基础的两个参数
该查询的一个唯一的键值
一个返回 Promise 的函数：
解析数据，或
抛出错误

2. 会对查询的数据进行缓存， 数据会氛围多个状态fresh（最新）、stale（旧的， 只有stale状态的时候才会重新获取数据， fresh不会重新获取数据）

2. 也不需要在useEffect(() => {}, [])中初始化调用接口，react-query会帮我们处理。

3. 查询键的值不能重复，需要保持唯一
*/



// useQuery基本使用， 重写App1实现
function Exemple1() {
  const queryData1 = useQuery(["details"], ({ queryKey }) => {
    console.log("detailsqueryKey1", queryKey);
    return getDetails();
  });
  const queryData2 = useQuery(["details"], ({ queryKey }) => {
    console.log("detailsqueryKey2", queryKey);
    return getDetails();
  });

  console.log('queryData1', queryData1)
  console.log('queryData2', queryData2)
  const { data, isLoading, isError, isSuccess } =
    queryData1;

  console.log("queryData", queryData1);
  console.log("isLoading", isLoading);
  console.log("isSuccess", isSuccess);
  console.log("isError", isError);
  console.log("data", data);
  return (
    <div>
      {data?.data?.name && <div>{data.data.name}</div>}
      {isLoading && <div>loading</div>}
    </div>
  );
}

function Exemple8() {
  const queryData1 = useQuery(["details"], ({ queryKey }) => {
    console.log("detailsqueryKey3", queryKey);
    return getDetails();
  });
  

  const { data, isLoading, isError, isSuccess } =
    queryData1;

  console.log("queryData3", queryData1);
  console.log("isLoading3", isLoading);
  console.log("isSuccess3", isSuccess);
  console.log("isError3", isError);
  console.log("data3", data);
  return (
    <div>
      {data?.data?.name && <div>{data.data.name}</div>}
      {isLoading && <div>loading</div>}
    </div>
  );
}

// useQuery error 处理
function Exemple2() {
  const queryData = useQuery(["details",], ({ queryKey }) => {
    console.log("detailsqueryKey", queryKey);
    return getDetails();
  });

  // 返回error 状态
  const { data, isLoading, isError, isSuccess } = useQuery('details', getDetails);

  console.log("queryData", queryData);
  console.log("isLoading", isLoading);
  console.log("isSuccess", isSuccess);
  console.log("isError", isError);
  console.log("data", data);
 
  return (
    <div>
      {data?.data?.name && <div>{data.data.name}</div>}
      {isLoading && <div>loading</div>}
    </div>
  );
}

// useQuery 并行请求， queryKey 改变重新请求
function Exemple3() {
  // 在setQuery更新时会导致useQuery重新执行
  const [query, setQuery] = useState(3333);
  const queryData = useQuery(["details", query], ({ queryKey }) => {
    // 等过请求一起请求，结果一起返回，data是一个数组
    return Promise.all([getDetails(), getList()]);
  });
  const { data, isLoading, isError, isSuccess } =
    queryData;

  console.log("queryData", queryData);
  console.log("isLoading", isLoading);
  console.log("isSuccess", isSuccess);
  console.log("isError", isError);
  console.log("data", data);
  return (
    <div>
      {/* {data?.data?.name && <div>{data.data.name}</div>} */}
      {isLoading && <div>loading</div>}
      <div onClick={() => setQuery(55555)}>开启useQuery</div>
    </div>
  );
}

// useQuery 依赖请求
function Exemple4() {
  const queryData = useQuery(["details"], ({ queryKey }) => {
    console.log("detailsqueryKey", queryKey);
    return getDetails();
  });
  
  const { data, isLoading } = queryData;
  

  const fileData = useQuery(
    ["list"],
    ({ queryKey }) => {
      console.log("queryData", data);
      console.log("listqueryKey", queryKey);
      return getList();
    },
    {
      /**
       * 该配置项在value为true时，会触发接口请求。
       * 因此当第一个接口请求返回后，此时该配置项表达式为true
       */
      enabled: !!data,
    }
  );

  console.log("fileData", fileData);

  return (
    <div>
      {data?.data?.name && <div>{data.data.name}</div>}
      {isLoading && <div>loading</div>}
    </div>
  );
}

// useQuery 区分stale和fresh状态
// 在stale状态时可以重新获取数据， ①组件挂载时， ②查询键改变时（会进行深度对比变化） ③页面重新被聚焦 ④网络重新连接 ⑤定时刷新
function Exemple5() {
  // 在setQuery更新时会导致useQuery重新执行
  const [query, setQuery] = useState(3333);
  const queryData = useQuery(
    ["details", query],
    ({ queryKey }) => {
      console.log("detailsqueryKey", queryKey);
      return getDetails();
    },
    {
      // 设置数据变为stale状态的时间， 毫秒数， 默认staleTime: 0， 请求完数据立刻变为stale状态
      staleTime: 1000 * 1,
      // 定时重新请求数据和数据状态无关
      // refetchInterval: 1000 * 3,
      // 断网重新联网重新请求数据
      refetchOnReconnect: true,
      // 切换页签重新获取数据
      refetchOnWindowFocus: true,
    }
  );
  const { isIdle, data, message, isLoading, isError, isSuccess, error } =
    queryData;

  console.log("queryData", queryData);
  console.log("isIdle", isIdle);
  console.log("isLoading", isLoading);
  console.log("isSuccess", isSuccess);
  console.log("isError", isError);
  console.log("data", data);
  console.log("error", error);
  console.log("message", message);
  return (
    <div>
      {data?.data?.name && <div>{data.data.name}</div>}
      {isLoading && <div>loading</div>}
      <div onClick={() => setQuery(55555)}>开启useQuery</div>
    </div>
  );
}

function Exemple6() {
  // 从上下文中获取 QueryClient
  const queryClient = useQueryClient();

  const detailsData = useQuery(["details"], ({ queryKey }) => {
    console.log("detailsqueryKey", queryKey);
    return getDetails();
  });

  const { data: details, isLoading, isSuccess } = detailsData;

  const listData = useQuery(["list"], ({ queryKey }) => {
    console.log("listqueryKey", queryKey);
    return getList();
  });

  const { data: list, isLoading: listLoading, isSuccess: listSuccess } = listData;

  return (
    <div>

      {details?.data?.name && <div>{details.data.name}</div>}
      {isLoading && <div>loading</div>}
      {isSuccess && <div>details 请求成功</div>}


      {list?.data?.fileList && <div>{list?.data?.fileList.join()}</div>}
      {listLoading && <div>list loading</div>}
      {listSuccess && <div>list 请求成功</div>}

      <div
        onClick={() => {
          queryClient.invalidateQueries(["list"]);
        }}
      >
        重新拉去list数据
      </div>
    </div>
  );
}

// 数据修改执行操作 useMutation
function Exemple7() {
  const mutation = useMutation((newTodo) => {
    console.log('newTodo', newTodo);
    return changeFile(newTodo);
  });

  const { isLoading, isSuccess } = mutation;
  console.log('isLoading', isLoading);
  console.log('isSuccess', isSuccess);

  return (
    <div>
      {isLoading && <div>loading</div>}
      {isSuccess && <div>数据修改完成请求成功</div>}
      <div
        onClick={() => {
          mutation.mutate({data: 1111, change: 2222});
        }}
      >
        修改数据
      </div>
    </div>
  );
}
```
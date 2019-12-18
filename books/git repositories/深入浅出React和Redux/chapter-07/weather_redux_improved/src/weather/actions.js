import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes.js';

let nextSeqId = 0;

export const fetchWeatherStarted = () => ({
  type: FETCH_STARTED
});

export const fetchWeatherSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result
})

export const fetchWeatherFailure = (error) => ({
  type: FETCH_FAILURE,
  error
})

export const fetchWeather = (cityCode) => {
  return (dispatch) => {
    const apiUrl = `/data/cityinfo/${cityCode}.html`;

    const seqId = ++ nextSeqId;
    console.log(seqId,'外',nextSeqId);

    //fetch是一个异步操作，不会阻塞同步代码。利用了闭包的特点把seqId保存了下来，每触发一次fetchWeather就往异步队列里面插入了一个dispathIfValid的任务它里面的seqId就是当前队列编号。dispathIfValid函数就是要检查一下当前环境的seqId是否等于全局的nextSeqId，如果相等说明这期间没有新的fetchWeather被调用，就继续使用dispatch函数。如果不相同，就说明这期间有新的fetchWeather被调用，也就是有新的访问服务器的请求被发出去了，这时候seqId代表的请求就已经过时，就不需要dispatch任何action了。
    //全局的nextSeqId一直是最新的队列编号，而异步队列里面的dispatchIfValid保存的seqId却是之前的队列编号，只有队列中的最后一个任务能跟全局的nextSeqId匹配上。
    const dispatchIfValid = (action) => {
      console.log(seqId,'内',nextSeqId);
      if (seqId === nextSeqId) {
        return dispatch(action);
      }
    }

    dispatchIfValid(fetchWeatherStarted())

    fetch(apiUrl).then((response) => {
      if (response.status !== 200) {
        throw new Error('Fail to get response with status ' + response.status);
      }

      response.json().then((responseJson) => {
        dispatchIfValid(fetchWeatherSuccess(responseJson.weatherinfo));
      }).catch((error) => {
        dispatchIfValid(fetchWeatherFailure(error));
      });
    }).catch((error) => {
      dispatchIfValid(fetchWeatherFailure(error));
    })
  };
}
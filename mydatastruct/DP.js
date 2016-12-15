//如果我们有面值为1元、3元和5元的硬币若干枚，如何用最少的硬币凑够n元？ 


const DP = function(sum,money) {
  let _dp = [0];
  for(let i = 1; i <= sum; i++) {
    _dp[i] = i;
    for(let j = 0; j < money.length; j++) {
      if(i >= money[j] && _dp[i-money[j]] + 1 < _dp[i]) {
        _dp[i] = _dp[i-money[j]] + 1;
      }
    }
  }
  return _dp;
}

console.log(DP(11,[1,3,5]));

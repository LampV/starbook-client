<view class="cu-bar tabbar bg-white shadow foot">
  <view class="cuIcon-cu-image action" wx:for="{{iconArray}}" wx:for-item="icon" wx:key="{{icon}}">
    <view class="cuIcon-{{icon}}{{curIcon==icon?'fill':''}}" data-icon="{{icon}}" bindtap="barIconTap"></view>
  </view>
</view>

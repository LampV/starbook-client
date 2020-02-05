<view class="container">
        <view wx:for="{{noteArray}}" wx:for-item="note" wx:key="{{note}}" wx:for-index="index">
            <note-row note="{{note}}" index="{{index}}" bind:statuschange="changeStatus"></note-row>
        </view>
    <view class="text-center text-gray">已经到底了</view>
</view>

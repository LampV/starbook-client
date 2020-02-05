<view class="container">
    <view class="notes-container">
        <block wx:for="{{note_list}}" wx:for-item="note" wx:key="{{note}}" wx:for-index="index">
            <note-row note="{{note}}" index="{{index}}" bind:statuschange="changeStatus"></note-row>
        </block>
        <view class='text-sm text-gray text-center'>已经到底了</view>
    </view>
    <view style="bottom:144rpx;right:14rpx;position:fixed;" bindtap="navToNewNote">
        <button class="cu-btn lg cuIcon-add bg-green text-lg round action add-action" style="height:100rpx;width:100rpx;font-size:44rpx;"></button>
    </view>

    <view class="cu-modal {{modalName=='DialogModal'?'show':''}}">
        <view class="cu-dialog">
            <view class="cu-bar bg-white justify-end">
                <view class="content">前往注册</view>
                <view class="action" bindtap="hideModal">
                    <text class="cuIcon-close text-red"></text>
                </view>
            </view>
            <view class="padding-xl text-xl">
                您还未注册!
            </view>
            <view class="cu-bar bg-white justify-end">
                <view class="action">
                    <button class="cu-btn line-green text-green" bindtap="hideModal">取消</button>
                    <button class="cu-btn bg-green margin-left" bindtap="GoSignIn">确定</button>
                </view>
            </view>
        </view>
    </view>

    <view class="cu-tabbar-height"></view>
</view>

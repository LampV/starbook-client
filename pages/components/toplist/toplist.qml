<view class="cu-card no-card cu-list menu-avatar">
    <view class="cu-item top-item" wx:for="{{users}}" wx:for-item="user" wx:for-index="index" wx:key="{{user}}">
        <view class="cu-avatar round lg" style="background-image:url({{user.avatar}});"></view>
        <view class="content flex-sub flex">
            <view class="flex-twice grid col-1">
                <view>{{user.nickname}}</view>
                <view class="text-gray text-sm">{{user.school}}</view>
            </view>

            <view class="flex-sub grid col-1 padding-right">
                <view class="flex top-text">
                    <view class="flex-twice">排名：</view>
                    <view class="flex-sub text-right">{{index + 1}}</view>
                </view>
                <view class="flex">
                    <view class="flex-sub">时长：</view>
                    <view class="flex-sub text-right">{{user.read_hour}} h</view>
                </view>
            </view>
        </view>
    </view>
</view>

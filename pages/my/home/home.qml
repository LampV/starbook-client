<view class="cu-card dynamic" wx:if="{{accountInfo}}">
    <view class="cu-item shadow ">
        <view class="cu-list menu margin-top sm-border">
            <view class="cu-item" style='padding-bottom: 30rpx;'>
                <view class="cu-avatar round xl" style="background-image:url({{accountInfo.avatar}});"></view>
                <view class="content flex-sub margin-lr">
                    <view class='justify-between margin-right-xl'>
                        <view >{{accountInfo.nickname}}</view>
                        <view class="{{accountInfo.gender==1 ? 'text-blue cuIcon-male' : 'text-pink cuIcon-female'}}">
                        </view>
                    </view>
                    <view class='text-gray text-sm flex justify-between'>
                        {{accountInfo.school}}
                    </view>
                </view>
            </view>

            <view class='cu-item flex text-center'>
                <view class='flex-sub padding-tb'>时长：{{accountInfo.read_hour}} 小时</view>
                <view class='flex-sub padding-tb'>天数：{{accountInfo.self_note_count}} 天</view>
            </view>
            
            <view class='cu-item arrow' bindtap='NavToMyNotes'>
                我的笔记
            </view>

            <view class='cu-item arrow' bindtap='NavToMyFavors'>
                我的收藏
            </view>
        </view>
    </view>
</view>

<view wx:else class="cu-card dynamic">
    <view class="cu-item shadow ">

        <view wx:if="{{!hasUserInfo && canIUse}}" class="cu-list menu-avatar xl text-xl margin-tb justify-center flex">
            <button  class="margin bg-gray lg cu-btn round" open-type="getUserInfo" bindgetuserinfo="getUserInfo">获取头像昵称</button>
        </view>

        <view wx:else class="cu-list menu-avatar xl text-xl margin-tb">
            <view class="cu-item">
                <view class="cu-avatar xl round " style="background-image:url({{userInfo.avatarUrl}});"></view>

                <view class="content text-gray text-right">
                    {{userInfo.nickName}}
                </view>
            </view>
        </view>
        <view class='cu-form-group' style='min-height:10px;'></view>
        <view class='cu-form-group padding-tb '>
            <view class="title">学校</view>
            <input placeholder='输入您的学校' bindinput='SchoolInput'></input>
        </view>
        <view class='cu-form-group' style='min-height:10px;'></view>

        <button class='lg bg-green shadow margin' bindtap='UserSignUp'>提交</button>

    </view>
</view>

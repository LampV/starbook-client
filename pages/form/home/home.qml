<view class="container">
    <scroll-view scroll-x class="bg-white nav cu-bar">
        <view class="flex text-center">
            <view class="cu-item flex-sub {{tabName==curTabName?'text-orange cur':''}}" wx:for="{{tabArray}}" wx:for-item="tabName" wx:key='{{tabName}}' bindtap="tabSelect" data-tabname="{{tabName}}">
                {{tabName}}
            </view>
        </view>
    </scroll-view>
    <swiper class="top_swiper" bindchange='SwiperChange' current-item-id='{{curSwiperName}}'>
        <swiper-item class="top_swiper_item" item-id='week_list'>
            <scroll-view class="top_scroll" scroll-y>
                <toplist users="{{week_list}}"></toplist>
            </scroll-view>
        </swiper-item>
        <swiper-item class="top_swiper_item" item-id='total_list'>
            <scroll-view class="top_scroll" scroll-y>
                <toplist users="{{total_list}}"></toplist>
            </scroll-view>
        </swiper-item>
    </swiper>
</view>

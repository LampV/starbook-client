<qs module="readHours">
    var getHour = function(minutes) { 
        var hour = Math.ceil(minutes / 60); 
        return hour; 
        } 
        module.exports.getHour = getHour;
</qs>
<view class="cu-card no-card dynamic margin-bottom">
    <view class="cu-item shadow">
        <view class="cu-list menu-avatar">
            <view class="cu-item">
                <view class="cu-avatar lg round" style="background-image:url({{note.avatar}});"></view>

                <view class="content flex-sub">
                    <view class="flex">
                        <view class="flex-sub">{{note.nickname}}</view>
                        <view class="flex-sub text-right text-gray text-sm">总时长：{{readHours.getHour(note.cum_reading)}} h</view>
                    </view>
                    <view class="text-gray text-sm flex justify-between">
                        {{note.school}}
                    </view>
                </view>
            </view>
        </view>
        <view class="text-content margin-left-df" data-noteid="{{note.nid}}" bindtap="componentNavToNote">
            <view>本次读书时长： {{note.read_duration}}分钟</view>
            <view>本次读书书籍：《{{note.book_name}}》</view>
            <view>今日读书感悟：</view>
            <view class="text-cut">{{note.text_content}}</view>
        </view>

        <view class="bg-img only-img" style="background-image:url({{note.img_link}});" wx:if='{{note.img_link}}'>
      </view>

        <view class="text-gray  text-right padding">
            <text class="cuIcon-like{{note.like_flag ? 'fill' : ''}} margin-lr-xs" data-noteid="{{note.nid}}" bindtap="triggleLikeChange"></text> 
            {{note.like_count}} 
            <text class="cuIcon-favor{{note.favor_flag ? 'fill' : ''}} margin-lr-xs" data-noteid="{{note.nid}}" bindtap="triggleFavorChange" ></text> 
            {{note.favor_count}}
            <text class="cuIcon-message margin-lr-xs" data-noteid="{{note.nid}}" bindtap="componentNavToNote"></text>  
            {{note.comment_count}}
        </view>
    </view>
</view>

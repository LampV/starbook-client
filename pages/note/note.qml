<qs module="readHours">
    var getHour = function(minutes) { 
        var hour = Math.ceil(minutes / 60); 
        return hour; 
        } 
        module.exports.getHour = getHour;
</qs>
<view class="cu-card dynamic no-card">
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
        <view class="text-content margin-left-df" >
            <view>本次读书时长： {{note.read_duration}}分钟</view>
            <view>本次读书书籍：《{{note.book_name}}》</view>
            <view>今日读书感悟：</view>
            <view>{{note.text_content}}</view>
        </view>

        <view class="bg-img only-img" style="background-image:url({{note.img_link}});" wx:if='{{note.img_link}}'>
      </view>

        <view class='text-gray margin-top-sm text-right'>{{note.post_date}}</view>

        <view class="text-gray  text-right padding">
            <text class="cuIcon-like{{note.like_flag ? 'fill' : ''}} margin-lr-xs" data-noteid="{{note.nid}}" bindtap="triggleNoteLikeChange"></text> 
            {{note.like_count}} 
            <text class="cuIcon-favor{{note.favor_flag ? 'fill' : ''}} margin-lr-xs" data-noteid="{{note.nid}}" bindtap="triggleNoteFavorChange" ></text> 
            {{note.favor_count}}
            <text class="cuIcon-message margin-lr-xs"></text>  
            {{note.comment_count}}
        </view>
    </view>


    <view class="cu-list menu-avatar comment solids-top">
      <view class="cu-item" wx:for='{{comments}}' wx:for-item='comment' wx:key='{{comment}}'>
        <view class="cu-avatar round" style="background-image:url({{comment.avatar}});"></view>
        <view class="content">
          <view class="text-grey">{{comment.nickname}}</view>
          <view class="text-gray text-content text-df">
            {{comment.text_content}}
          </view>
          <view class="margin-top-sm flex justify-between">
            <view class="text-gray text-df">{{comment.post_date}}</view>
          </view>
        </view>
      </view>
      <view class="flex cu-bar" style="bottom: 0px"></view>
    </view>

    <view class="flex cu-bar foot input" style="bottom: 0px">

        <input class="margin-left-lg solid-bottom" bindinput='commentInput' adjust-position="{{false}}" focus="{{false}}" maxlength="300" cursor-spacing="10" value='{{cur_comment}}'></input>
        <button class="cu-btn bg-green shadow" bindtap='sendComment'>评论</button>

    </view>
</view>
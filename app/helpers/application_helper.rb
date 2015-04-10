module ApplicationHelper
  def csrf_inject
    (<<-HTML).html_safe
    <input type="hidden"
           name="authenticity_token"
           value=#{form_authenticity_token}>
    HTML
  end

  def url_h(obj, prefix = nil, singular = false)
    class_name = obj.class.name.downcase # User => 'users'
    class_name = class_name.pluralize unless singular # 'users'
    method_name = :"#{prefix ? prefix + "_" : ''}#{class_name}_url" # 'new_users_url'
    Rails.application.routes.url_helpers.send method_name, obj.id
  end

  def owns?(item)
    current_user.admin? || (item.try(:user_id) == current_user.id)
  end


  def icon
    {
      'internet' => 'icon laptop large',
      'kitchen'  => 'icon food large',
      'tv'       => 'icon desktop large',
      'dungeon'       => 'icon desktop large',
      'moat'       => 'icon desktop large',
      'secret_passages'       => 'icon desktop large',
      'random_mosnters'       => 'icon desktop large',
      'endless_dungeons'       => 'icon desktop large',
      'dragons'       => 'icon desktop large',
      'maze'       => 'icon desktop large',
      'treasure'       => 'icon desktop large',
      'high_tower_room'       => 'icon desktop large',
      'grand_library'       => 'icon desktop large',
      'default'  => 'icon checkmark large',
    }
  end

end

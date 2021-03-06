class ContentItemMutator
  CHILDCARE_URLS = ['/guidance/how-to-register-as-a-childminder-or-nanny-quick-guide',
    '/legal-right-work-uk',
    '/government/publications/become-a-registered-early-years-or-childcare-provider-in-england',
    '/government/publications/applying-to-waive-disqualification-early-years-and-childcare-providers'
  ].freeze

  def self.mutate_content_item(content_item)
    return content_item if empty_content_store_response?(content_item)
    base_path = content_item['base_path']
    mutated_content_item = content_item.to_hash

    if TaskNavigationService.new(base_path: base_path).applicable_content?
      mutated_content_item.merge!(task_nav(base_path))
    end
    mutated_content_item
  end

  def self.empty_content_store_response?(content_item)
    content_item.respond_to?(:raw_response_body) && content_item.raw_response_body.empty?
  end

  def self.task_nav(base_path)
    TaskNavigationService.new(base_path: base_path).navigation_config
  end

  def self.task_navigation_service(base_path)
  end
end

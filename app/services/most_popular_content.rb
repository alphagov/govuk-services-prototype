class MostPopularContent
  attr_reader :content_id

  def initialize(content_id:)
    @content_id = content_id
  end

  def self.fetch(content_id:)
    new(content_id: content_id).fetch
  end

  def fetch
    search_response
      .documents
      .sort_by { |document| document.title }
  end

private

  def hide_from_most_popular
    %w(
      /teacher-training-funding
      /nhs-bursaries
      /apply-online-for-student-finance
      /student-finance
      /apply-for-student-finance
      /government/publications/apprenticeship-funding-and-performance-management-rules-2017-to-2018
      /government/publications/apprenticeship-funding-bands
      /government/collections/apprenticeship-standards
    )
  end

  def search_response
    RummagerSearch.new(
      start: 0,
      count: 7,
      fields: %w(title link),
      filter_navigation_document_supertype: 'guidance',
      reject_link: hide_from_most_popular,
      filter_part_of_taxonomy_tree: content_id,
      order: '-popularity',
    )
  end
end

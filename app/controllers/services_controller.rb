class ServicesController < ApplicationController
  layout 'collections'

  def show
    @page_schema = ServincePageFinder.find(params[:base_path])
  end

  class ServincePageFinder
    def self.find(base_path)
      file = File.read("config/service_pages/#{base_path}.json")
      JSON.parse(file, object_class: OpenStruct)
    rescue Errno::ENOENT
      return nil
    end
  end
end

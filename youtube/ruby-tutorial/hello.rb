class Book
    attr_accessor :title, :author, :pages

    def initialize(title, author, pages = 400)
        @title = title
        @author = author
        @pages = pages
    end

    def to_object() 
        return {
            :title => @title,
            :author => @author,
            :pages => @pages
        }
    end
end

lotr = Book.new("Lord of the Rings", "J. R. R. Tolkien", 1000)
hp =  Book.new("Harry Potter", "J. K. Rowling")

puts lotr.to_object()
puts hp.to_object()

class A
    def foo()
        return "foo"
    end
    def bar()
        return "bar"
    end
end

class B < A
    def foo()
        return super() + '!'
    end
    def baz()
        return "baz"
    end
end

a = A.new()
b = B.new()

puts a.foo()
puts b.foo()
puts b.baz()
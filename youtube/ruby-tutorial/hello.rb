def sayHi(name = "EnterNameHere")
    puts "Hello, " + name.to_s + "!"
    return 1, 2
end

a = sayHi()[1]
a += sayHi("Nill")[0]

if (a == 5)
    puts "a is 5"
elsif (a < 5)
    puts "a is smaller than 5"
else 
    puts "a is bigger than 5"
end 

puts a ** 3

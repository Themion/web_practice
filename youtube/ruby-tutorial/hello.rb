File.open('./file.txt', "r") do |file|
    puts file.readchar()
    puts file.readchar()
    puts file.readchar()
    puts file.read()
end

puts

File.open('./file.txt', "r") do |file|
    for line in file.readlines()
        puts line
    end
end

puts

file = File.open('./file.txt', 'r')
puts file.read
# file.close()
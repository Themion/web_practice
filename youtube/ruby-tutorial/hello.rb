begin
    nums = [1, 2, 3, 4, 5]
    key = "num"
    puts nums[key]
rescue TypeError => e
    print "Type error:\t\t "
    puts e
rescue ZeroDivisionError => e
    print "Division by zero error:\t "
    puts e
rescue
    puts "unknown error"
end


begin
    num = 10 / 0
rescue TypeError => e
    print "Type error:\t\t "
    puts e
rescue ZeroDivisionError => e
    print "Division by zero error:\t "
    puts e
rescue
    puts "unknown error"
end

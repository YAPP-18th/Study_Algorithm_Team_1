def solution(cacheSize, cities):
    answer = 0
    cache = []
    for city in cities:
        city = city.lower()
        if city in cache:
            answer += 1
            cache.remove(city)
            cache.append(city)
        else:
            answer += 5

            if len(cache) <= cacheSize:
                cache.append(city)

            if len(cache) > cacheSize:
                cache.pop(0)
    return answer

# 캐시 리스트를 만들고, 처음 들어오는 값에 대해서는 5를 더한 후, 캐시 저장용량에 허용하는 한 추가한다.
# 캐시 적중된 값에 대해서는 1을 더하고, 그 값을 리스트 맨 뒤로 이동시킨다.
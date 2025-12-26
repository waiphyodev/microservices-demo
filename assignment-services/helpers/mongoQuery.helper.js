const getSearchField = (search, fields) => ({
    $addFields: {
        searchField: {
            $or: fields?.map((field) => ({
                $regexMatch: {
                    input: field,
                    regex: search,
                    options: "i",
                },
            })),
        },
    },
});

const getMatchQuery = (query) => {
    const matchQuery = Object.entries(query).reduce(
        (a, [key, value]) => {
            if (value !== "" && value !== undefined && key !== "page" && key !== "limit" && key !== "search" && key !== "sort") {
                const valueArray = value.split(",").map((item) => item.trim());

                if (key === "createdAt") {
                    a[key] = {
                        $gte: new Date(parseInt(valueArray[0]) || valueArray[0]),
                        $lte: new Date(parseInt(valueArray[1]) || valueArray[1]),
                    };
                } else {
                    a[key] = { $in: valueArray };
                }
            }

            console.log("matchQuery => ", a);

            return a;
        },
        { searchField: query.search ? true : false }
    );

    return {
        $match: matchQuery,
    };
};

const getSortQuery = (query) => {
    if (query.sort) {
        const sortQuery = query.sort
            .split(",")
            .map((field) => {
                const [name, order] = field.split(":");
                return { [name]: order === "desc" ? -1 : 1 };
            })
            .reduce((acc, cur) => ({ ...acc, ...cur }), {});

        return {
            $sort: sortQuery,
        };
    } else {
        return {
            $sort: {
                _id: 1,
            },
        };
    }
};

const getPageSkip = (page = 1, limit = 10) => {
    return {
        $skip: (Number(page) - 1) * Number(limit),
    };
};

const getPageLimit = (limit = 10) => {
    return {
        $limit: Number(limit),
    };
};

module.exports = {
    getSearchField,
    getMatchQuery,
    getSortQuery,
    getPageSkip,
    getPageLimit,
};

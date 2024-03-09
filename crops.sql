CREATE TABLE crops AS --need is mm of water needed at mid-growth, the peak
    SELECT "Tobacco" AS name, 4.55 AS need, 0.32 AS initial, 0.68 AS development, 1 AS middle, 0.86 AS final UNION
    SELECT "Maize"          , 4.81 AS need, 0.46 AS initial, 0.69 AS development, 1 AS middle, 0.76 AS final
    SELECT "Sorghum"        , 4.58 AS need, 0.36 AS initial, 0.64 AS development, 1 AS middle, 0.69 AS final
    SELECT "Wheat"          , 3.24 AS need, 0.32 AS initial, 0.68 AS development, 1 AS middle, 0.60 AS final
    SELECT "Cotton"         , 5.13 AS need, 0.39 AS initial, 0.65 AS development, 1 AS middle, 0.74 AS final
    SELECT "Alfalfa"        , 21.8 AS need, 0.36 AS initial, 0.86 AS development, 1 AS middle, 0.85 AS final
    SELECT "Banana"         , 4.00 AS need, 0.34 AS initial, 0.77 AS development, 1 AS middle, 0.74 AS final
    SELECT "Citrus"         , 3.01 AS need, 0.33 AS initial, 0.61 AS development, 1 AS middle, 0.60 AS final
    SELECT "Potato"         , 4.44 AS need, 0.41 AS initial, 0.68 AS development, 1 AS middle, 0.82 AS final
    SELECT "Groundnut"      , 4.44 AS need, 0.40 AS initial, 0.73 AS development, 1 AS middle, 0.73 AS final
    SELECT "Olive"          , 2.25 AS need, 0.93 AS initial, 0.96 AS development, 1 AS middle, 1.00 AS final
    SELECT "Grape"          , 4.07 AS need, 0.35 AS initial, 0.68 AS development, 1 AS middle, 0.53 AS final
    SELECT "Safflower"      , 5.87 AS need, 0.33 AS initial, 0.66 AS development, 1 AS middle, 0.23 AS final
    SELECT "Soybean"        , 4.60 AS need, 0.43 AS initial, 0.72 AS development, 1 AS middle, 0.43 AS final
    SELECT "Sunflower"      , 6.15 AS need, 0.33 AS initial, 0.66 AS development, 1 AS middle, 0.33 AS final
    SELECT "Bean"           , 3.85 AS need, 0.35 AS initial, 0.67 AS development, 1 AS middle, 0.30 AS final
    SELECT "Pea"            , 4.25 AS need, 0.43 AS initial, 0.72 AS development, 1 AS middle, 0.96 AS final
    SELECT "Sugarbeet"      , 3.33 AS need, 0.29 AS initial, 0.65 AS development, 1 AS middle, 0.67 AS final
    SELECT "Sugarcane"      , 5.33 AS need, 0.32 AS initial, 0.66 AS development, 1 AS middle, 0.60 AS final
    SELECT "Cabbage"        , 2.67 AS need, 0.67 AS initial, 0.88 AS development, 1 AS middle, 0.90 AS final
    SELECT "Onion"          , 2.80 AS need, 0.70 AS initial, 0.85 AS development, 1 AS middle, 1.00 AS final
    SELECT "Pepper"         , 4.50 AS need, 0.57 AS initial, 0.83 AS development, 1 AS middle, 0.86 AS final
    SELECT "Tomato"         , 4.76 AS need, 0.52 AS initial, 0.76 AS development, 1 AS middle, 0.70 AS final
    SELECT "Watermelon"     , 5.00 AS need, 0.40 AS initial, 0.70 AS development, 1 AS middle, 0.75 AS final
#!/usr/bin/python3

def pascal_triangle(n):
    """
    Generate Pascal's triangle up to the nth row.

    Parameters:
    n (int): The number of rows in Pascal's triangle to generate.

    Returns:
    List[List[int]]: list of lists of integers representing Pascal's triangle
                     Returns an empty list if n <= 0.
    """
    if n <= 0:
        return []

    triangle = []
    for i in range(n):
        row = [1] * (i + 1)
        for j in range(1, i):
            row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]
        triangle.append(row)

    return triangle

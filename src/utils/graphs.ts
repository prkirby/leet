/**
 * Vertex of a graph
 * @type K Scalar type used as a unique id
 * @type V Data type stored in the vertex
 */
export type Vertex<K, V> = {
  id: K
  data: V
}

/**
 * Edge of a graph
 * @type K Scalar type used as a unique id for each Vertex
 * @type V Data type stored in the Vertices
 */
export type Edge<K, V> = {
  orig: Vertex<K, V>
  dest: Vertex<K, V>
}

/**
 * Adjacency List representation of a Graph
 * @type K Scalar type used as an id for each vertex
 * @type V Data type that each vertex holds
 */
export type Graph<K, V> = {
  vertices: Map<K, Vertex<K, V>>
  adjList: Map<K, Array<Edge<K, V>>>
}

function edgeFindFunc<K, V>(edge: Edge<K, V>): (e: Edge<K, V>) => boolean {
  return (e: Edge<K, V>) =>
    e.orig.id === edge.orig.id && e.dest.id === edge.dest.id
}

export function addEdge<K, V>(
  graph: Graph<K, V>,
  edge: Edge<K, V>,
  directional = false
): Graph<K, V> {
  const newGraph = Object.assign(graph, {})
  newGraph.vertices.set(edge.orig.id, edge.orig)
  newGraph.vertices.set(edge.dest.id, edge.dest)

  let edgeListForward = newGraph.adjList.get(edge.orig.id)
  let edgeListBackward = newGraph.adjList.get(edge.dest.id)

  if (!edgeListForward) {
    newGraph.adjList.set(edge.orig.id, [])
    edgeListForward = newGraph.adjList.get(edge.orig.id)
  }

  if (!directional && !edgeListBackward) {
    newGraph.adjList.set(edge.dest.id, [])
    edgeListBackward = newGraph.adjList.get(edge.dest.id)
  }

  if (!edgeListForward!.find(edgeFindFunc(edge))) {
    edgeListForward!.push(edge)
  }

  const reverseEdge: Edge<K, V> = { orig: edge.dest, dest: edge.orig }
  if (!directional && !edgeListBackward!.find(edgeFindFunc(reverseEdge))) {
    edgeListBackward!.push(reverseEdge)
  }

  return newGraph
}

export function Graph<K, V>(): Graph<K, V> {
  return {
    vertices: new Map(),
    adjList: new Map(),
  }
}

function exploredToGraph<K, V>(
  explored: Map<K, K | null>,
  originalGraph: Graph<K, V>,
  end: K
): Graph<K, V> {
  let graph = Graph<K, V>()
  let child = end
  let parent = explored.get(child)
  while (parent !== null && parent !== undefined) {
    graph = addEdge(graph, {
      orig: originalGraph.vertices.get(parent)!,
      dest: originalGraph.vertices.get(child)!,
    })
    child = parent
    parent = explored.get(parent)
  }
  return graph
}

export function bfsLinear<K, V>(
  graph: Graph<K, V>,
  start: K,
  end?: K
): Graph<K, V> {
  const exploredEdges: Set<[K, K]> = new Set()
  const exploredVerticesWithParent: Map<K, K | null> = new Map()
  const levels: Array<Set<K>> = []
  let i = 0
  const startVertex = graph.vertices.get(start)
  if (!startVertex) return Graph<K, V>()

  levels[i] = new Set()
  levels[i].add(startVertex.id)
  let lastVisited = startVertex.id
  exploredVerticesWithParent.set(lastVisited, null)
  while (levels[i].size) {
    levels[i + 1] = new Set()
    for (const vertexId of levels[i]) {
      const edges = graph.adjList.get(vertexId)
      if (!edges) continue
      for (const edge of edges) {
        if (exploredEdges.has([edge.orig.id, edge.dest.id])) continue
        exploredEdges.add([edge.orig.id, edge.dest.id])
        const dest = edge.dest
        const orig = edge.orig
        if (!exploredVerticesWithParent.has(dest.id)) {
          exploredVerticesWithParent.set(dest.id, orig.id)
          levels[i + 1].add(dest.id)
          lastVisited = dest.id
          if (end && dest.id === end) {
            return exploredToGraph(exploredVerticesWithParent, graph, dest.id)
          }
        }
      }
    }
    i++
  }

  return exploredToGraph(exploredVerticesWithParent, graph, lastVisited)
}

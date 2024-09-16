import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const ProfileLightbox = ({ profile, connections, onClose, onNodeClick }) => {
  const svgRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(profile);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous content

      const width = window.innerWidth * 0.7;
      const height = window.innerHeight * 0.7;

      svg.attr("width", width)
         .attr("height", height)
         .style("background-color", "black");

      const simulation = d3.forceSimulation([selectedNode, ...connections])
        .force("link", d3.forceLink().id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(30));

      const link = svg.append("g")
        .selectAll("line")
        .data(connections.map(d => ({ source: selectedNode, target: d })))
        .enter().append("line")
        .attr("stroke", "#fff")
        .attr("stroke-opacity", 0.6);

      const node = svg.append("g")
        .selectAll("circle")
        .data([selectedNode, ...connections])
        .enter().append("circle")
        .attr("r", d => d === selectedNode ? 25 : 20)
        .attr("fill", d => d === selectedNode ? "#fff" : "#999")
        .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended))
        .on("click", (event, d) => {
          if (d !== selectedNode) {
            setSelectedNode(d);
            onNodeClick(d);
          }
        });

      const text = svg.append("g")
        .selectAll("text")
        .data([selectedNode, ...connections])
        .enter().append("text")
        .text(d => d.name)
        .attr("font-size", "10px")
        .attr("fill", "#fff")
        .attr("dx", 12)
        .attr("dy", 4);

      simulation.on("tick", () => {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

        node
          .attr("cx", d => Math.max(20, Math.min(width - 20, d.x)))
          .attr("cy", d => Math.max(20, Math.min(height - 20, d.y)));

        text
          .attr("x", d => Math.max(20, Math.min(width - 20, d.x)))
          .attr("y", d => Math.max(20, Math.min(height - 20, d.y)));
      });

      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
    }
  }, [selectedNode, connections]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-black p-8 rounded-lg relative w-[70vw] h-[70vh]">
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">{selectedNode.name}'s Network</h2>
        <svg ref={svgRef} className="w-full h-full"></svg>
      </div>
    </div>
  );
};

export default ProfileLightbox;

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ProfileLightbox = ({ profile, connections, onClose }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous content

      const width = 800;
      const height = 600;

      const simulation = d3.forceSimulation(connections)
        .force("link", d3.forceLink().id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-50))
        .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg.append("g")
        .selectAll("line")
        .data(connections.map(d => ({ source: profile, target: d })))
        .enter().append("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6);

      const node = svg.append("g")
        .selectAll("circle")
        .data([profile, ...connections])
        .enter().append("circle")
        .attr("r", d => d === profile ? 10 : 5)
        .attr("fill", d => d === profile ? "#000" : "#666");

      const text = svg.append("g")
        .selectAll("text")
        .data([profile, ...connections])
        .enter().append("text")
        .text(d => d.name)
        .attr("font-size", "10px")
        .attr("dx", 12)
        .attr("dy", 4);

      simulation.nodes([profile, ...connections]).on("tick", () => {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);

        text
          .attr("x", d => d.x)
          .attr("y", d => d.y);
      });
    }
  }, [profile, connections]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg relative">
        <button
          className="absolute top-4 right-4 text-black text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">{profile.name}'s Network</h2>
        <svg ref={svgRef} width="800" height="600"></svg>
      </div>
    </div>
  );
};

export default ProfileLightbox;